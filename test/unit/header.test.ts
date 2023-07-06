import { screen } from "@testing-library/react";
import renderPage from "../helpers/renderPage";
import "@testing-library/jest-dom";

describe("Шапка", () => {
  it("должна содержать ссылки на страницы сайта", () => {
    // тесты на проверку наличия ссылок в шапке
    const { render } = renderPage('/');
    const {container} = render;
    const navBar  = container.querySelector('nav');
    const navLinks = navBar?.querySelectorAll('.nav-link');
    
    const linksToContain = ["/catalog", "/delivery", "/contacts", "/cart"];
    const linksContained: string[] = [];
    if (navLinks && navLinks.length > 0) {
      navLinks.forEach((link) => {
        if (link.hasAttribute("href")) {
          const href = link.getAttribute("href");
          if (href) {
            linksContained.push(href);
          }
        }
      });
    }
    expect(linksContained).toStrictEqual(linksToContain);
  });

  it("ссылка на название магазина должна вести на главную страницу", () => {
    // тесты на проверку правильности ссылки на главную страницу
    renderPage('/');
    const storeNameLink = screen.queryByText("Example store", { exact: true });

    expect(storeNameLink).toBeInTheDocument();
    expect(storeNameLink).toHaveAttribute('href', '/');
  });
});