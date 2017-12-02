import App from "./components/app";
import { CookiesProvider } from "react-cookie";

export default function Root() {
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
}
