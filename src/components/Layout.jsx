import avatar from '../images/avatar.png'
import shoppingcart from '../icons/shopping.png'
import frame272 from '../icons/Frame272.png'
import frame66 from '../icons/frame66.png'
import logo from '../icons/logo.png'
import Select from 'react-select';
import { ArrowLeft, ArrowDown, ChevronDown } from 'lucide-react';
import CountryFlag from 'react-country-flag';
import Mainpage2 from './Mainpage2.jsx'
import Invoice2 from './Invoice2.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatWithBotpress from './ChatWithBotpress.jsx'
import Chatnow from './Chatnow.jsx'
import Chatbotnow from './Chatbotnow.jsx'



const options = [
  { value: 'gh', label: 'Ghana', flag: 'GH' },
  { value: 'us', label: 'United States', flag: 'US' },
  { value: 'ng', label: 'Nigeria', flag: 'NG' },
];

// Show only the flag and dropdown arrow in the selected value
const customSingleValue = ({ data }) => (
  <div className="flex items-center">
    <CountryFlag countryCode={data.flag} svg style={{ width: '25px' }} />
    <ChevronDown fill='pink' size={16} style={{color:'pink'}} /> {/* Custom dropdown arrow */}
  </div>
);

// Component to show only the flag in the dropdown options
const customOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} className="flex items-center p-2">
      <CountryFlag countryCode={data.flag} svg style={{ width: '25px' }} />
    </div>
  );
};


// Remove all borders, backgrounds, etc.
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    padding: 0,
    minHeight: 'auto',
  }),
  dropdownIndicator: () => ({
    display: 'none', // Remove built-in dropdown arrow if you're using a custom one
  }),
  indicatorSeparator: () => ({
    display: 'none', // Remove the separator
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: 0,
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: 'none', // Remove default dropdown shadow
  }),
};



const Layout = () => {
  return (
    <>
      <div className="">
        <header className="flex justify-between items-center mb-5 md:mb-0 md:ml-8 md:mr-5">
          <div className="flex items-center gap-2 md:gap-6">
            <img className="w-2/4" src={logo}/>
            <img className="w-4 md:w-5" src={frame272}/>
          </div>
          <div className="flex items-center md:space-x-7">
            <img className="w-5" src={shoppingcart}/>
            <img className="w-24 md:w-32 md:h-7" src={frame66} />
            <Select
              options={options}
              components={{ SingleValue: customSingleValue, Option: customOption }}
              className="mt-[-25px]"
              defaultValue={options[0]} 
              isSearchable={false}  
              styles={customStyles}
            />
               <div className='flex justify-center items-center'>
            <img className='w-7 md:w-11' src={avatar}/>
            <hi className='font-semibold px-2'>Ama</hi>
            <ChevronDown fill='black' />
          </div>

          </div>
        </header>

        {/*   START:: NAV-BAR */}
        <nav className='flex justify-between ml-9 mr-10 mb-3'>
          <div className='flex gap-3 items-center'>
            <h1 className="bg-pink-600 w-6 h-6 flex justify-center items-center rounded-md"><ArrowLeft color='white' fill="none" /></h1>
            <h1 className='font-semibold text-sm'>Back</h1>
          </div>
       
        </nav>

        <Routes>
          <Route path="/" element={<Mainpage2 />} />
          <Route path="/invoice2" element={<Invoice2 />} /> {/* Ensure InvoicePage component exists */}
          <Route path="/bot" element={<ChatWithBotpress />} /> 
          <Route path="/chat" element={<Chatnow />} /> 
          <Route path="/chatbot" element={<Chatbotnow />} /> 
        </Routes>

      </div>
    </>
  )
}
export default Layout;