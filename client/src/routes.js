import Main from './pages/Main'
import ChartPage from './pages/ChartPage'
import { TestPage } from './pages/TestPage'
import { DashboardPage } from './pages/DashboardPage'
import { StepanDashboardPage } from './pages/StepanDashboardPage'

export const Routes = [
    // {
    //     path: '/',
    //     Component: DashboardPage
    // },
    {
        path: '/More',
        Component: ChartPage
    },
    {
        path: '/Test',
        Component: TestPage
    },
    {
        path: '/view/:id',
        Component: ChartPage
    },
    {
        path: '/',
        Component: StepanDashboardPage
    }
]