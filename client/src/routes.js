import Main from './pages/Main'
import ChartPage from './pages/ChartPage'
import { TestPage } from './pages/TestPage'
import { DashboardPage } from './pages/DashboardPage'

export const Routes = [
    {
        path: '/',
        Component: DashboardPage
    },
    {
        path: '/More',
        Component: ChartPage
    },
    {
        path: '/Test',
        Component: TestPage
    },
    {
        path: '/Diagrams/:id',
        Component: ChartPage
    }
]