import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { twMerge } from "tailwind-merge";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import BaseModalLayout from "../../../views/layouts/BaseModalLayout";
import BaseModalHeading from "../base-headings/BaseModalHeading";
import BaseView from "../base-view/BaseView";
import Button from "../button/Button";
import LightButton from "../button/LightButton";

const BaseModal = (props) => {
  const {
    header,
    buttons,
    children,
    className,
    isCancellable = true,
    fullScreen = false,
    isTranscript = false,
  } = props;
  const { title, icon, iconSize, bgColor } = header;

  const { goBackModal } = useModalDispatcher();

  const renderButton = ({ item, index }) => {
    const classes = twMerge(`
      ${item.className || ""}
    `);

    const textClasses = twMerge(`
      ${item.classes?.textClassName || ""}
    `);

    if (item["render"]) {
      return item["render"];
    }

    return (
      <Button
        key={index}
        {...item}
        className={classes}
        classes={{ textClassName: textClasses }}
      />
    );
  };

  return (
    <BaseModalLayout>
      <BaseView className={"relative z-10 transition ease-in-out delay-300"}>
        <BaseView
          className={
            "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity transition ease-in-out delay-300"
          }
        ></BaseView>
        <BaseView
          className={
            "fixed inset-0 z-10 overflow-y-auto transition ease-in-out delay-300"
          }
        >
          <BaseView
            className={
              "flex min-h-full items-end justify-center p-4 text-center sm:items-center h-full sm:p-0 transition ease-in-out delay-300"
            }
          >
            <BaseView
              className={twMerge(` 
              ${isTranscript ? "absolute top-0 " : " relative "}
               dark:bg-gray-700 rounded-lg transform bg-white text-left shadow-xl transition ease-in-out delay-300 ${
                fullScreen
                  ? "sm:w-full sm:max-w-screen-2xl "
                  : "sm:my-8 sm:w-full sm:max-w-2xl "
              }
                  `)}
            >
              <BaseView
                className={
                  "bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                }
              >
                <BaseView className={"flex my-2 justify-between"}>
                  <BaseModalHeading text={title} />
                  <FontAwesomeIcon
                    icon={"xmark"}
                    size={"lg"}
                    className={
                      "my-auto cursor-pointer text-gray-700 dark:text-white"
                    }
                    onClick={goBackModal}
                  />
                </BaseView>
                <BaseView>{children}</BaseView>
              </BaseView>
              <BaseView
                className={
                  "bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
                }
              >
                {buttons?.map((item, index) => renderButton({ item, index }))}
                {isCancellable && (
                  <LightButton
                    label={"Kapat"}
                    onClick={goBackModal}
                    className={"ease-in-out delay-150"}
                  />
                )}
              </BaseView>
            </BaseView>
          </BaseView>
        </BaseView>
      </BaseView>
    </BaseModalLayout>
  );
};

export default BaseModal;
