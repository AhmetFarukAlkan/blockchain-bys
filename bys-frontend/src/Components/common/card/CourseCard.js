import React from "react";
import BaseView from "../base-view/BaseView";
import { twMerge } from "tailwind-merge";
import { URL } from "../../../Constants/urlConstants";
import { Link } from "react-router-dom/cjs/react-router-dom";
import BaseText from "../base-text/BaseText";

const CourseCard = (props) => {
  const { course, className } = props;

  const cardClasses = twMerge(`
        p-4 cursor-pointer rounded-xl 
        overflow-hidden shadow-lg
        bg-white dark:bg-gray-800 h-full   
        ${className || ""}
    `);

  return (
    <Link to={URL.OPENED_COURSE + "/" + course?.id}>
      <BaseView className={cardClasses}>
        <BaseView className="px-6 py-8">
          <BaseView className="font-bold text-2xl mb-4 text-indigo-800">
            {course?.name}
          </BaseView>
          <BaseView className="text-gray-700 text-lg mb-2">
            <BaseText className={"font-bold"} text={course?.departmentName} />
            <BaseText className={"font-bold"} text={`${course?.code} - ${course?.credit} Kredi`} />
          </BaseView>
          <BaseView className="text-gray-700 text-lg mb-2">
            <BaseText className={"font-bold"} text={course?.teacherName} />
            <BaseText className={"font-bold"} text={course?.year} />
          </BaseView>
        </BaseView>
      </BaseView>
    </Link>
  );
};

export default CourseCard;
