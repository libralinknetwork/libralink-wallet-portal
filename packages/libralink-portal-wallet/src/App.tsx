import Routes from "routes";
import { I18nextProvider } from "react-i18next";

import i18n from "i18n";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Routes></Routes>
    </I18nextProvider>
  );
};

export default App;
