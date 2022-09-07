import { useTitle } from "../../hooks/useTitle";
import { NotFoundWrapper } from "../../styles/NotFound.style";
export const NotFound = ({ title }) => {
  useTitle("Not Found");
  return (
    <NotFoundWrapper>
      <h1>
        Not found <span>:(</span>
      </h1>
      <p>{title}</p>
      <i>404</i>
    </NotFoundWrapper>
  );
};
