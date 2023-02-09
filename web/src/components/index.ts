import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

/* ==============================  CONTAINERS  ============================== */
export const Card = styled.div`
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(35, 36, 38, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

export const Container = styled.div`
  box-sizing: border-box;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
`;

export const Flex = styled.div<{ flex?: number }>`
  flex: ${(props) => props.flex || 1};
`;

export const Stack = styled.div<{ direction?: string; gap?: number }>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'column'};
  gap: ${(props) => props.gap?.toString().concat('rem') || '1rem'};
`;

export const ContainerApp = styled(Stack)<{ backgroundImage?: string }>`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)),
    ${(props) => `url(${props.backgroundImage})`};
  background-attachment: fixed;
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: space-between;
  padding: 4rem 1rem;
  min-height: 100vh;
`;
/* ============================  END CONTAINERS  ============================ */

/* ================================  BUTTONS  =============================== */
export const Button = styled.button`
  align-items: center;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background-color: rgba(35, 36, 38, 0.1);
  border: 1px solid rgba(115, 114, 111, 0.5);
  border-radius: 3px;
  color: rgb(4, 191, 104);
  cursor: pointer;
  display: flex;
  place-content: center;
  letter-spacing: 0.025rem;
  padding: 1rem 2.65rem;
  width: 100%;
`;

export const ButtonAdd = styled(Button)`
  color: rgb(4, 191, 104);
  border: 1px solid rgba(4, 191, 104, 0.65);
`;

export const ButtonGreen = styled(Button)`
  background-color: rgb(4, 191, 104);
  border-color: rgb(4, 191, 104);
  color: rgb(38, 8, 22);
`;

export const ButtonIcon = styled.button`
  background-color: transparent;
  border: none;
  color: rgb(217, 37, 37);
  display: flex;
  place-items: center;
`;

export const ButtonLink = styled(RouterLink)`
  align-items: center;
  background-color: rgba(35, 36, 38, 0.1);
  border: 1px solid rgba(115, 114, 111, 0.5);
  color: rgb(4, 191, 104);
  cursor: pointer;
  display: flex;
  place-content: center;
  letter-spacing: 0.025rem;
  padding: 1rem 2.65rem;
  width: 100%;
`;

export const ButtonReset = styled(Button)`
  color: rgb(242, 135, 5);
  border: 1px solid rgb(242, 135, 5);
`;
/* ==============================  END BUTTONS  ============================= */

/* =================================  FORMS  ================================ */
export const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const FormField = styled.input`
  background-color: rgba(35, 36, 38, 0.1);
  border: 1px solid rgba(115, 114, 111, 0.5);
  border-radius: 3px;
  color: rgb(191, 189, 184);
  padding: 1rem;
  width: 100%;
`;

export const FormFieldContainer = styled.div`
  position: relative;
`;

export const FormFieldInnerLabel = styled.p`
  color: rgb(191, 189, 184);
  font-style: italic;
  position: absolute;
  top: 1rem;
  max-width: fit-content;
  padding-right: 1rem;
  right: 0;
`;

export const Select = styled.select`
  background-color: rgba(35, 36, 38, 0.1);
  border: 1px solid rgba(115, 114, 111, 0.5);
  border-radius: 3px;
  color: rgb(191, 189, 184);
  padding: 1rem;
  width: 100%;

  option {
    background-color: rgb(35, 36, 38);
  }
`;
/* ===============================  END FORMS  ============================== */

/* ==============================  TYPOGRAPHY  ============================== */
export const Banner = styled.h1<{ align?: string }>`
  color: rgb(4, 191, 104);
  font-size: 4rem;
  text-align: ${(props) => `${props.align}`};
`;

export const Header = styled.h1<{ align?: string; size?: string }>`
  color: rgb(4, 191, 104);
  font-size: ${(props) => `${props.size}`};
  font-weight: 600;
  letter-spacing: 0.20rem;
  text-align: ${(props) => `${props.align}`};
`;

export const Link = styled(RouterLink)`
  color: rgb(191, 189, 184);
`;
/* ============================  END TYPOGRAPHY  ============================ */
