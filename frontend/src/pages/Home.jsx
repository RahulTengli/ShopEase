import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { userAuth } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const [category, setCategory] = useState('');
  const {token} = userAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  },[token,navigate])

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((res) => {
      setProducts(res.data);
    });
  }, []);

  const filteredProducts = products
    .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
    .filter((product) => (category ? product.category === category : true))
    .sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border px-4 py-2 rounded" onChange={(e) => setSort(e.target.value)}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
        <select className="border px-4 py-2 rounded" onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
