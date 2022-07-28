import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";
import { Timer, Scroll } from "phosphor-react";

import Logo from "../../assets/Logo.svg";

export function Header() {
  return (
    <HeaderContainer>
      <img src={Logo} alt="" />
      <nav>
        <NavLink to={"/"} title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to={"/history"} title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
