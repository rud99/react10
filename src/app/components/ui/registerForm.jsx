import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/ validator";
import api from "../../api";
import SelectField from "../common/form/selectField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: ""
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    const validatorConfog = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязательна для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состаять миниму из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Профессия обязательна для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                onChange={handleChange}
                options={professions}
                defaultOption="Choose..."
                error={errors.profession}
                value={data.profession}
                label="Выберите Вашу профессию"
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
