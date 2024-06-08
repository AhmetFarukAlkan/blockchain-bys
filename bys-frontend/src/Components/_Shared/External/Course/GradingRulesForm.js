import React, { useEffect } from "react";
import BaseView from "../../../common/base-view/BaseView";
import NumericInput from "../../../common/form-elements/NumericInput";
import { LetterGrades } from "../../../../Enum/LetterGrades";
import BaseText from "../../../common/base-text/BaseText";
import { formSetter } from "../../../../Utils/utils";

const GradingRulesForm = (props) => {
  const { gradingRules, form } = props;

  useEffect(() => {
    const initialValues = {};

    if (gradingRules) {
      const parsedGradingRules = JSON.parse(gradingRules);
      Object.keys(parsedGradingRules).map((key, index) => {
        initialValues[`grading_rules[${key}]`] = parsedGradingRules[key];
      });
    } else {
      LetterGrades.forEach((letterGrade) => {
        initialValues[`grading_rules[${letterGrade.value}]`] = letterGrade.defaultValue;
      });
    }

    formSetter({ form, values: initialValues });
  }, []);

  return (
    <BaseView className={"grid grid-cols-3 gap-1"}>
      {LetterGrades.map((letterGrade) => (
        <React.Fragment key={letterGrade.value}>            
          <BaseText
            text={`${letterGrade.label} Notu`}
          />
          <NumericInput
            name={`grading_rules[${letterGrade.value}]`}
            form={form}
            className={'max-w-16'}
            disabled={letterGrade.disable}
            max={letterGrade.nextLetterGrade ? form.watch(`grading_rules[${letterGrade.nextLetterGrade}]`) - 1 : 100}
            min={form.watch(`grading_rules[${letterGrade.prevLetterGrade}]`) + 1}
            rules={{required: 'Bu alan zorunludur'}}
          />
          <BaseText
            text={`${form.watch(`grading_rules[${letterGrade.value}]`)} → ${letterGrade.nextLetterGrade ? (form.watch(`grading_rules[${letterGrade.nextLetterGrade}]`) - 1) : 100}`}
          />
        </React.Fragment>
      ))}
    </BaseView>
  );
};

export default GradingRulesForm;
