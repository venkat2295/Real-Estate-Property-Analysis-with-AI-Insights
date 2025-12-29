import {useState} from 'react';
import {createProperty} from '../services/api';

type Props ={
    onSuccess: ()=> void;
};

export default function PropertyForm({onSuccess}:Props){
    const [form,setForm] = useState({
        title: '',
        location: '',
        price: '',
        size: '',
        bedrooms: '',
        bathrooms: '',
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const submit = async(e:React.FormEvent)=>{
        e.preventDefault();
        await createProperty({
            ...form,
            price:Number(form.price),
            size:Number(form.size),
            bedrooms:Number(form.bedrooms),
            bathrooms:Number(form.bathrooms),
        });
        onSuccess();
        setForm({
            title: '',
            location: '',
            price: '',
            size: '',
            bedrooms: '',
            bathrooms: '',
        });
    };
    return(
        <div className = "bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add Property</h2>

      <form
        onSubmit={submit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Property
        </button>
      </form>
        </div>
    )
}