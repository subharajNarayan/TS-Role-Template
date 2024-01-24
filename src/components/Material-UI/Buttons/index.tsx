import React, { ComponentProps, Ref } from "react";
import Button from "@mui/material/Button";
import "./button.scss";

export interface LoadingButtonProps extends ComponentProps<typeof Button> {
  forwardedRef?: Ref<any>;
  loading?: boolean;
  text?: any;
  small?: any;
}

export default function MUIButton(props: LoadingButtonProps) {
  const { forwardedRef, loading, text, children, ...args } = props;

  return (
    <Button
      {...args}
      ref={forwardedRef}
      className={`${props.className} ${
        props.small ? " custom-btn-small" : "custom-button"
      }`}
    >
      {children ? (
        loading ? (
          <div className={loading ? "loading" : ""}>
            <div>{children}</div>
            {loading && <div className="spinner"></div>}
          </div>
        ) : (
          children
        )
      ) : (
        <div className={loading ? "loading" : ""}>
          <div>{text}</div>
          {loading && <div className="spinner"></div>}
        </div>
      )}
    </Button>
  );
}
