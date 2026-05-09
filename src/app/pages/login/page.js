import Link from "next/link";
import styles from "../../globals.css";

export default function Login() {
  return (
    <div
      class="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5"
      tabindex="-1"
      role="dialog"
      id="modalSignin"
    >
      <div class="modal-dialog">
        <div class="modal-content rounded-4 shadow">
          <div class="modal-header p-5 pb-4 border-bottom-0">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <p className="mb-0 text-center fs-4 text-dark">Bem vindo ao</p>

              <span
                className="fs-2 fw-bold "
                style={{ color: "var(--primaryColor)" }}
              >
                HERMES!
              </span>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-5 pt-0">
            <form class="">
              <div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control rounded-3"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control rounded-3"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div class="pt-1 mb-4" style={{
                  width:"100%",
                  display:"flex",
                  justifyContent:"flex-end"
              }}>
                  <a class="text-decoration-none"
                  style={{ color: "var(--primaryColor)" }} 
                  href="#">
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>
              <button
                class="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                type="submit"
                style={{
                  backgroundColor: "var(--primaryColor)",
                  borderColor: "none",
                }}
              >
                Entrar
              </button>
              <small class="text-body-secondary">
                By clicking Sign up, you agree to the terms of use.
              </small>
              <hr class="my-4" />
              <div class="text-center" >
                  <p class="text-decoration-none">
                    Não tem uma conta? contate seu sindico
                  </p>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
