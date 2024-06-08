import React from "react";
import TextInput from "../../../common/form-elements/TextInput";
import BaseView from "../../../common/base-view/BaseView";
import { DegreeLevels } from "../../../../Enum/DegreeLevels";
import Select from "../../../common/form-elements/Select";

const DepartmentForm = (props) => {
  const { department, form } = props;

  return (
    <BaseView className={"grid grid-cols-1 gap-4 gap-y-2"}>
      <TextInput
        label="Adı"
        form={form}
        name="name"
        rules={{ required: "Ad Zorunludur" }}
        defaultValue={department?.name}
      />
      <TextInput
        label="E-Mail"
        form={form}
        name="email"
        rules={{ required: "E-Mail Zorunludur" }}
        defaultValue={department?.email}
      />
      <TextInput
        label="Telefon"
        form={form}
        name="phone_number"
        rules={{ required: "Telefon Numarası Zorunludur" }}
        defaultValue={department?.phone_number}
      />
      <TextInput
        label="Lokasyon"
        form={form}
        name="location"
        rules={{ required: "Lokasyon Zorunludur" }}
        defaultValue={department?.location}
      />
      <Select
        label="Derecesi"
        form={form}
        name="degree_level"
        options={DegreeLevels}
        rules={{ required: "Derece Zorunludur" }}
        defaultValue={department?.degree_level}
      />
      <TextInput
        label="Cüzdan Adresi"
        form={form}
        name="wallet_address"
        rules={{ required: "Cüzdan Adresi Zorunludur" }}
        defaultValue={department?.wallet_address}
      />
    </BaseView>
  );
};

export default DepartmentForm;
