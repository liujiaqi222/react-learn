import { createContext } from "react";


export type LocaleContextType = {
  locale:'zh-CN'|'en-US'
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "en-US",
});

export default LocaleContext;