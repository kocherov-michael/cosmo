import './../blocks/logo/logo.js'
import './../blocks/vk/vk.js'
import './../blocks/git/git.js'
import './../blocks/centerText/centerText.js'
import './../blocks/menuIcon/menuIcon.js'
import './../blocks/menu/menu.js'
import './../blocks/about/about.js'
import './../blocks/button/button.js'
import './../blocks/education/education.js'
import './../blocks/personal/personal.js'
import './../blocks/sertificat/sertificat.js'
import './../blocks/technologies/technologies.js'
import './../blocks/technology/technology.js'
import './../blocks/contacts/contacts.js'
import './../blocks/mailForm/mailForm.js'
import './../blocks/input/input.js'
import './../blocks/portfolio/portfolio.js'
import './../blocks/site/site.js'
import './../blocks/canvas/canvas.js'
import './../blocks/dropdown/dropdown.js'
import './../blocks/sertificatsSlider/sertificatsSlider.js'
import './../blocks/success/success.js'

import Menu from './../blocks/menu/menu.js'

const menu = new Menu()
menu.menuElementListener('data-menu-about', 'data-about-header')
menu.menuElementListener('data-menu-portfolio', 'data-portfolio-header')
menu.menuElementListener('data-menu-contacts', 'data-contacts-header')
