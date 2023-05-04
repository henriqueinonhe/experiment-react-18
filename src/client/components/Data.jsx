import { isClient } from "../utils";

export const Data = ({ context }) => {
  const data = context.current;

  const hasData = isClient && window.__DATA__;

  if (!data.promise && !hasData) {
    data.promise = new Promise((resolve) => {
      setTimeout(() => {
        data.isFinished = true;
        resolve();
      }, 1500);
    });
  }

  if (!data.isFinished && !hasData) {
    throw data.promise;
  }

  return (
    <>
      <Helper />
      Data
    </>
  );
};

const Helper = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.__DATA__ = true;
          `,
      }}
    />
  );
};
