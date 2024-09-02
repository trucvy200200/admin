import SliderCaptcha from "rc-slider-captcha"
import { useTranslation } from "react-i18next"
import React, { useRef, useState } from "react"
import { useEffect } from "react"
import { randomInt } from "ut2"
import { Modal, Checkbox } from "antd"
import createPuzzle from "create-puzzle"
import styled from "styled-components"

const MAX_WIDTH = 400

const LIMIT = 10

const Container = styled.div`
  cursor: pointer;
  max-width: 250px;
  border-radius: 10px;
  border: 1px solid #d5d5d5;
  padding: 13px 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  p {
    margin: 0;
  }
`

const ModalStyled = styled(Modal)`
.ant-modal-footer{display: none}
  .rc-slider-captcha-jigsaw {
    margin: auto;
    border-radius: 10px;
  }
  .rc-slider-captcha-loading{
    margin: auto;
  }
  .rc-slider-captcha-control-tips,
  .rc-slider-captcha-button,
  .rc-slider-captcha-control-indicator {
    border-radius: 10px;
  }
  .rc-slider-captcha-control {
    border-radius: 10px;
    max-width: ${MAX_WIDTH}px;
    margin: auto;
  }
  .ant-modal-body {
    padding: 20px;
`

function SliderCaptchaWrapper({ validateCaptcha, captcha }) {
  const offsetXRef = useRef(0)
  const actionRef = useRef(null)
  const { t } = useTranslation()
  const [images, setImages] = useState()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getImages()
  }, [open])

  useEffect(() => {
    !captcha && actionRef.current?.refresh()
  }, [captcha])

  function getRandomId() {
    return Math.floor(Math.random() * 1000) + 1
  }

  async function getImages() {
    let imageUrls = []
    for (let i = 0; i < LIMIT; i++) {
      const randomId = getRandomId()
      const newImageUrl = `https://picsum.photos/id/${randomId}/${MAX_WIDTH}`
      imageUrls.push(newImageUrl)
    }
    setImages(imageUrls)
  }

  return (
    <>
      <Container onClick={() => !captcha && setOpen(!open)}>
        <Checkbox checked={captcha} onChange={() => !captcha && setOpen(!open)} /> <p>{t("I'm not a robot")}</p>
      </Container>
      {open ? (
        <ModalStyled open={open} onCancel={() => setOpen(false)} footer={false}>
          <SliderCaptcha
            tipText={{
              default: t("Slide to verify captcha"),
              loading: t("Loading"),
              moving: t("Moving"),
              verifying: t("Verifying"),
              success: t("Captcha verified"),
              error: t("Verify error")
            }}
            loadingBoxProps={{ text: t("Loading") }}
            className="w-100"
            request={() =>
              createPuzzle(images[Math.floor(Math.random() * 10)], {
                x: randomInt(80, 300),
                format: "blob"
              }).then((res) => {
                offsetXRef.current = res.x

                return {
                  bgUrl: res.bgUrl,
                  puzzleUrl: res.puzzleUrl
                }
              })
            }
            onVerify={async (data) => {
              if (data.x >= offsetXRef.current - 5 && data.x < offsetXRef.current + 5) {
                setOpen(false)
                validateCaptcha(true)
                return Promise.resolve()
              }
              validateCaptcha(false)
              return Promise.reject()
            }}
            actionRef={actionRef}
            bgSize={{
              width: MAX_WIDTH,
              height: MAX_WIDTH
            }}
            loadingDelay={300}
          />
        </ModalStyled>
      ) : null}
    </>
  )
}

export default SliderCaptchaWrapper
