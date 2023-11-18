"use client"

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from "next/navigation";

function LoggedOut(){
    const router = useRouter();

    function navigateloginPage(){
        router.push("/auth/login");
    }

    function navigateregistrationPage(){
        router.push("/auth/register");
    }
    
    return (
        <div>
            <button onClick={navigateloginPage} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-800 hover:bg-white mt-4 lg:mt-0 mx-2">Login</button>
            <button onClick={navigateregistrationPage} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-800 hover:bg-white mt-4 lg:mt-0 mx-2">Register</button>
        </div>
    )
}

function LoggedIn() {
    const router = useRouter();
    
    function navigateLogoutPage(){
        router.push("/auth/logout");
    }

    return (
        <div>
            <button onClick={navigateLogoutPage} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-800 hover:bg-white mt-4 lg:mt-0 mx-2">Logout</button>
        </div>
    )
}

export default function Status() {
    const [token, setToken] = useState<any>(null);
    const [loading, setLoading] = useState(true); // Add a new state for loading
    const router = useRouter();
    const pathname = usePathname();
  
    useEffect(() => {
      function handleStorageChange() {
        setToken(sessionStorage.getItem('token'));
        setLoading(false); // Set loading to false after token is updated
      }
  
      handleStorageChange();
    }, []);
  
    useEffect(() => {
      if (!loading) { // Only push a new route if not loading
        if (token && (pathname == '/dashboard' || pathname == '/auth/login')) {
          router.push('/dashboard'); 
        } else if (!token && (pathname == '/'|| pathname == '/auth/logout')) {
          router.push('/');
        }
      }
    }, [token, loading]);
  
    // Render a placeholder button if loading, otherwise render based on token
    return loading ? <PlaceholderButton /> : (token ? <LoggedIn /> : <LoggedOut />);
  }
  
  function PlaceholderButton() {
    return (
      <div>
        <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-800 hover:bg-white mt-4 lg:mt-0 mx-2" disabled>Loading</button>
      </div>
    );
  }
  