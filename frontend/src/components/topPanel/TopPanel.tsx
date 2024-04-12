import './TopPanel.scss'
import * as Icons from '../../icons/Icons'


export const TopPanel = () => {
    return (
        <header className='top-panel'>
            <div className='top-panel__navigation-bar-wrapper'>
                <div className='top-panel__burger-icon'>
                    <Icons.OpenBurgerMenu />
                </div>
                <div className='top-panel__logo'>
                    <Icons.LogoIcon size={Icons.logoSizeType.Small} color={Icons.logoColorType.Light} />
                </div>
            </div>
            <label className='search-input-wrapper'>
                <input type="search" placeholder='Поиск по названию...' />
                <div className='search-input-wrapper__icon'>
                    <Icons.SearchIcon />
                </div>
            </label>
        </header>
    )
}