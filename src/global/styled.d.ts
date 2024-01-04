import "styled-components";
import { DefaultTheme } from "styled-components";

import theme from "./theme";

export type ITheme = typeof theme & DefaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
