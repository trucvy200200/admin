import styled from "styled-components"

export const CaptchaWrapper = styled.div`
  width: 100%;
  .scaptcha-anchor-container {
    max-width: 250px;
    border-radius: 10px;
  }
  .scaptcha-card-container {
    border-radius: 10px;
  }
  @media (max-width: 639.98px) {
    max-width: 80%;
    margin: 0 auto;
    .innerCaptcha {
      justify-content: center;
    }
  }
  .innerCaptcha {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  #reload_href {
    display: none;
  }
  svg {
    cursor: pointer;
    transform: translateY(-3px);
  }
`
