import React, { useState } from "react"
import { Card, Modal, Button, Input } from "reactstrap"
import { useTranslation } from "react-i18next"
import Select from "react-select"
import { selectThemeColors } from "@utils"
import styled from "styled-components"
import { LANGUAGES } from "@constants/base-constant"
import { useForm, Controller } from "react-hook-form"
import classnames from "classnames"
import { X } from "react-feather"

import "./styles.scss"
import "@styles/react/libs/react-select/_react-select.scss"

const SelectStyled = styled(Select)`
  width: 200px;
`

export const ConfirmReject = ({ defaultValue, button, heading, message, submit, cancel, reasonList, language }) => {
  const { t } = useTranslation()
  const { register, reset, control } = useForm()
  const [data, setData] = useState(defaultValue || null)
  const [errorNote, setErrorNote] = useState(false)

  return (
    <Modal isOpen={true} centered toggle={() => {}} className={"modal-md delete-modal"}>
      <Card className={"mb-0 p-2 text-center pt-3"}>
        <div className={"d-flex justify-content-center message mb-0"}>
          <h3>{heading}</h3>
          <p>{message}</p>
        </div>
        {data?.type !== "other" ? (
          <SelectStyled
            defaultValue={defaultValue}
            styles={{
              container: (provided, state) => ({
                ...provided,
                textAlign: "center"
              }),
              valueContainer: (provided, state) => ({
                ...provided,
                overflow: "visible",
                textAlign: "center"
              }),
              placeholder: (provided, state) => ({
                ...provided,
                position: "absolute",
                textAlign: "center",
                width: "100%",
                opacity: state.hasValue || state.selectProps.inputValue ? "0" : "1",
                visibility: state.hasValue || state.selectProps.inputValue ? "hidden" : "visible",
                transition: "all 0.1s ease"
              })
            }}
            style={{ width: "100%" }}
            placeholder={t(`Select a warning`)}
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            getOptionValue={(value) => value.id}
            getOptionLabel={(value) => (language === LANGUAGES.VI ? value.valueVi : value.valueEn)}
            options={reasonList}
            isClearable={false}
            onChange={(value) => {
              setData(value)
            }}
          />
        ) : (
          <Controller
            name="note"
            control={control}
            defaultValue={""}
            render={({ field }) => {
              return (
                <div className="position-relative">
                  <X
                    onClick={() => {
                      reset()
                      setData(null)
                    }}
                    size={20}
                    className="position-absolute cursor-pointer"
                    style={{ right: 2, top: 2 }}
                  />
                  <Input
                    value={data?.noteWarning || ""}
                    type="textarea"
                    id="note"
                    placeholder={t("Enter warning")}
                    {...register("note", {
                      required: true,
                      onChange: (e) => {
                        setData({ ...data, noteWarning: e.target.value })
                      }
                    })}
                    className={classnames({ "is-invalid": errorNote })}
                    {...field}
                  />
                </div>
              )
            }}
          />
        )}

        <div className={"btns"} style={{ gap: "5px", paddingTop: "20px" }}>
          <Button
            disabled={!data}
            color={"primary"}
            onClick={() => {
              if (data?.type === "other" && !data?.noteWarning) return setErrorNote(true)
              setErrorNote(false)
              submit(data)
            }}
          >
            {button}
          </Button>
          <Button color={"secondary"} outline onClick={() => cancel()}>
            {t("Cancel")}
          </Button>
        </div>
      </Card>
    </Modal>
  )
}
