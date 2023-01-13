import { useAddress, useDisconnect, useUser, useLogin, useLogout, useMetamask } from '@web3sdks/react';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const login = useLogin();
  const logout = useLogout();
  const { user } = useUser();

  return (
    <div>
      {address ? (
        <>
          <button onClick={disconnect}>Disconnect Wallet</button>
          <button onClick={() => login()}>Login with Wallet</button>
          <button onClick={logout}>Logout</button>
          <p>Your address: {address}</p>
          <pre>User: {JSON.stringify(user || null, undefined, 2)}</pre>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Home;
