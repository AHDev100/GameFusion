import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    function handleStorageChange() {
      setToken(sessionStorage.getItem('token'));
    }

    handleStorageChange();
  }, []);

  useEffect(() => {
    token ? router.push('/dashboard') : router.push('/');
  }, [token]);

  return token ? <LoggedIn /> : <LoggedOut />;
}
