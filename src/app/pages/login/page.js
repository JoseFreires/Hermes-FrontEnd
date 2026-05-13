import Link from "next/link";
import styles from "./page.module.css";
import { Button } from "../../components/Button/button";
import Image from "next/image";

export default function Login() {
  return (
    <div className={styles.body}>
      <div className={styles.Form}>
          < div className={styles.login}>
            <div className="modal-content rounded-4 shadow" style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center "
            }}>
              <Image
                  src="/img/Projeto HermesLogo.png"
                  alt="Login"
                  width={97}
                  height={100}
                />
              <div className="modal-header p-5 pb-4 border-bottom-0">
                
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <p className="mb-0 text-center fs-4 text-dark">
                    Bem vindo ao
                  </p>

                  <span
                    className="fs-2 fw-bold "
                    style={{ color: "var(--primaryColor)" }}
                  >
                    HERMES!
                  </span>
                </div>
              </div>
              <div className="modal-body p-5 pt-0">
                <form className="">
                  <div>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control rounded-3"
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control rounded-3"
                        id="floatingPassword"
                        placeholder="Password"
                      />
                      <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div
                      className="pt-1 mb-4"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <a
                        className="text-decoration-none"
                        style={{ color: "var(--primaryColor)" }}
                        href="#"
                      >
                        Esqueceu sua senha?
                      </a>
                    </div>
                  </div>
                  <button
                    className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                    type="submit"
                    style={{
                      backgroundColor: "var(--primaryColor)",
                      borderColor: "none",
                    }}
                  >
                    Entrar
                  </button>
                  <small className="text-body-secondary">
                    By clicking Sign up, you agree to the terms of use.
                  </small>
                  <hr className="my-4" />
                  <div className="text-center">
                    <p className="text-decoration-none">
                      Não tem uma conta? contate seu sindico
                    </p>
                  </div>
                </form>
              </div>
            </div>
        </div>
      </div>
      <div className={styles.loginImg}>
        <img
          src="/img/loginImage.png"
          alt="Login"
          className={styles.art}
        />
      </div>
    </div>
  );
}
