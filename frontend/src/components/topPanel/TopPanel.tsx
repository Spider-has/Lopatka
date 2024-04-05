import './TopPanel.scss'
import * as Icons from '../../icons/Icons'


export const TopPanel = () => {
    return (
        <header className='top-panel'>
            <div className='top-panel__navigation-bar-wrapper'>
                <div className='navigation-bar'>
                    <Icons.OpenBurgerMenu />
                </div>
                <Icons.LogoIcon />
            </div>
            <label className='search-input-wrapper'>
                <input type="search" placeholder='Поиск по названию...' />
                <Icons.SearchIcon />
            </label>
        </header>
    )
}