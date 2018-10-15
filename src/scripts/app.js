import homeController from './controllers/home'
import positionController from './controllers/position'
import searchController from './controllers/search'
import profileController from './controllers/profile'
import sortController from './controllers/sort'
import shopCarController from './controllers/shopCar'
import Router from '../utils/router'
const router = new Router()

homeController.render();
 
router.route("#position",positionController.render)
router.route("#sort",sortController.render)
router.route("#search",searchController.render)
router.route("#shopCar",shopCarController.render)
router.route("#profile",profileController.render)
router.init();

