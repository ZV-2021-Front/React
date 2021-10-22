import Main from './pages/Main'
import ChartPage from './pages/ChartPage'
import { TestPage } from './pages/TestPage'

export const Routes = [
    {
        path: '/',
        Component: Main
    },
    {
        path: '/More',
        Component: ChartPage
    },
    {
        path: '/Test',
        Component: TestPage
    }
]