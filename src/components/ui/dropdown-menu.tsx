import React, { Component, ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

interface LinkStyle 
{
  default: string;
  destructive: string;
}

const LINK_STYLES: LinkStyle = 
{
  default:     "block m-2 px-2 py-2 rounded-md text-e hover:bg-d",
  destructive: "block m-2 px-2 py-2 rounded-md text-e hover:bg-destructive hover:text-destructive-foreground"
};


interface DropdownLinkProps 
{
  name: string;
  url: string;
  type: 'default' | 'destructive';
  icon?: React.ComponentType<{ className?: string }>;
}

export const DropdownLink: React.FC<DropdownLinkProps> = ({ name, url, type, icon: Icon }) => 
  (
    <a href={url} className={LINK_STYLES[type]}>
      {Icon && <Icon/>}
      {name}
    </a>
  );

interface DropdownMenuState 
  {
    isOpen: boolean;
    delay: number;
  }
interface DropdownMenuProps 
{
  title: string;
  children?: ReactNode;
}

export class DropdownMenu extends Component<DropdownMenuProps, DropdownMenuState> 
{
  state = { isOpen: false, delay: 400 };
  handleMouseInteraction = (action: 'open' | 'close') => 
    {
      if (action === 'open') 
        {
          this.setState({ isOpen: true });
        } 
        else 
        {
          const timeoutId = setTimeout(() => 
            {
              this.setState({ isOpen: false });
            }, this.state.delay);
          return () => clearTimeout(timeoutId);
        }
    };

  render() 
  {
    const { children, title } = this.props;
    const { isOpen } = this.state;

    return (
      <div 
        className="relative" 
        onMouseEnter={() => this.handleMouseInteraction('open')}
      >
        <button 
          className="flex items-center text-e hover:c font-semibold"
          aria-expanded={isOpen}
        >
          {title}
          {isOpen ? <ChevronUpIcon className="w-4 h-4 mx-2" /> : <ChevronDownIcon className="w-4 h-4 mx-2" />}
        </button>
        <div className={`absolute right-0 mt-4 w-48 bg-white rounded-md shadow-xl ${isOpen ? 'block' : 'hidden'}`}
             onMouseLeave={() => this.handleMouseInteraction('close')}>
          {children}
        </div>
      </div>
    );
  }
}
