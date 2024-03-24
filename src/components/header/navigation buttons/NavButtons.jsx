// In your 'nav-icons.jsx' file
import { iconsRoutes } from "../navigation/routes";
import { useState } from 'react';

export const NavButtons = () => {
    const [inputValue, setInputValue] = useState('');
    const placeholderText = 'Найти жест по №';

    const handleFocus = (e) => {
        e.target.placeholder = '';
      };

      const handleBlur = (e) => {
        if (!inputValue) {
          e.target.placeholder = placeholderText;
        }
      };

      const handleInput = (e) => {
        setInputValue(e.target.value);
      };
    
  return (
    <div className="flex flex-row items-center justify-center">
        <input 
        type="text" 
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        placeholder={placeholderText}
        className="text-xs text-start pl-4 w-[150px] h-[38px] bg-[#303339] text-[#728796] outline-none rounded-lg focus:text-start focus:pl-4"></input>
        <ul className="flex m-[9px]">
        {iconsRoutes.map((route) => {
            const { href, Icon, title } = route;
            return (
                <li key={title}>
                    <a href={href}>
                    <img src={Icon} alt={title} />
                    </a>
                </li>
            );
        })}
        </ul>
        {/* Выпадающее меню с выбором языка */}
    </div>
  );
};
