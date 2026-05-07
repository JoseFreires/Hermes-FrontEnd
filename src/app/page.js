import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="container mt-5">
      <h1 className="text-primary">Bootstrap funcionando 🚀</h1>

      <button className="btn btn-success" >
        <a href="/pages/login">Go to Login</a>  
      </button>
    </div>

    </div>
  );
}
