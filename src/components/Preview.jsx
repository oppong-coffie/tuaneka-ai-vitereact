import react from 'react'
import { Button, Card, Divider, Input } from "@nextui-org/react";
// import { BiQuestionMark } from 'lucide-react';
import { Textarea } from "@nextui-org/react";
import be from '../images/b2.png'
import invoice from '../images/invoice.png'


const Preview = () => {
    return (
        <>
            <main className='ml-9 mr-9'>
                <h2 className="text-3xl font-bold mb-6">Generate your invoice with AI</h2>

                <div className='md:flex justify-between'>
                    <div className='text-3xl font-semibold text-slate-600'>
                        Preview
                    </div>
                    <img className='md:w-2/6' src={invoice}/>
                    <img className="hidden md:inline-block" src={be} alt="description" />
                    </div>

            </main>
        </>
    )
}

export default Preview;