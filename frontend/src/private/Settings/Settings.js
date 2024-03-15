import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { getSettings, updateSettings } from "../../services/SettingsService";
import Menu from "../../components/Menu/Menu";

function Settings() {
  const inputEmail = useRef("");
  const inputDepartament = useRef("");
  const inputPhone = useRef("");
  const inputNewPassword = useRef("");
  const inputConfirmPassword = useRef("");

  const history = useHistory();

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  //useEffect é o hook pra chamada no backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    getSettings(token)
      .then((settings) => {
        if (inputEmail.current && inputDepartament.current) {
          inputEmail.current.value = settings.email;
          inputDepartament.current.value = settings.departament;
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401)
          return history.push("/");
        if (err.response) setError(err.response.data);
        else setError(err.message);
      });
  }, []);

  function onFormSubmit(event) {
    event.preventDefault();

    if (
      (inputNewPassword.current.value || inputConfirmPassword.current.value) &&
      inputNewPassword.current.value !== inputConfirmPassword.current.value
    ) {
      return setError(
        "Os campos nova senha e confirme a senha devem ser iguais"
      );
    }
    const token = localStorage.getItem("token");
    updateSettings(
      {
        email: inputEmail.current.value,
        password: inputNewPassword.current.value
          ? inputNewPassword.current.value
          : null,
        department: inputDepartament.current.value,
        phone: inputPhone.current.value,
      },
      token
    )
      .then((result) => {
        if (result) {
          setError("");
          setSuccess("Configurações Atualizadas com Sucesso!");
          inputNewPassword.current.value = "";
          inputConfirmPassword.current.value = "";
        } else {
          setSuccess("");
          setError("Não é possível atualizar as configurações");
        }
      })
      .catch((error) => {
        setSuccess("");
        console.error(error.message);
        setError("Não é possível atualizar as configurações");
      });
  }

  return (
    <React.Fragment>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h1 className="h4">Configurações</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card card-body border-0 shadow mb-4">
              <h2 className="h5 mb-4">Configurações Pessoais</h2>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      ref={inputEmail}
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      //value={settings.email || ""}
                      //onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="departament">Departamento</label>
                    <input
                      ref={inputDepartament}
                      className="form-control"
                      id="departament"
                      type="text"
                      placeholder="Prefeitura de Campo Grande"
                      //value={settings.phone || ""}
                      //onChange={onInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="telegramChat">Telefone</label>
                    <input
                      ref={inputPhone}
                      className="form-control"
                      id="phone"
                      type="text"
                      placeholder="+55 67 987654321"
                      //value={settings.phone || ""}
                      //onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="telegramChat">Telegram Chat ID</label>
                    <a
                      //href={"https://t.me/" + settings.telegramBot}
                      className="badge bg-secondary py-1 ms-1"
                    >
                      ?
                    </a>
                    <input
                      className="form-control"
                      id="telegramChat"
                      type="text"
                      placeholder="Digite o seu Telegram Chat ID"
                      //value={settings.telegramChat || ""}
                      //onChange={onInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div>
                    <label htmlFor="password">Nova Senha</label>
                    <input
                      ref={inputNewPassword}
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="Digite sua Nova Senha"
                      //value={settings.password || ""}
                      //onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div>
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <input
                      //ref={confirmPassword}
                      ref={inputConfirmPassword}
                      className="form-control"
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirme sua Nova Senha"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                  <div className="col-sm-3">
                    <button
                      className="btn btn-gray-800 mt-2 animate-up-2"
                      type="button"
                      onClick={onFormSubmit}
                    >
                      Salvar
                    </button>
                  </div>
                  {error ? (
                    <div className="alert alert-danger mt-2">{error}</div>
                  ) : success ? (
                    <div className="alert alert-success mt-2">{success}</div>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Settings;
