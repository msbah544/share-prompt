"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [authProviders, setAuthProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setAuthProviders(response);
    };

    setProviders();
  }, []);

  //const isUserLoggedIn = !true;

  const { data: session } = useSession();

  return (
    <nav className=" flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="promptopia_logo"
          className=" object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/**desktop nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={`/create-prompt`} className="black_btn">
              Create Post
            </Link>
            <button className="outline_btn" onClick={() => signOut()}>
              Sign out
            </button>
            <Image
              className=" rounded-full"
              width={37}
              height={37}
              //src={`/assets/images/logo.svg`}
              src={session?.user.image}
              alt="profile_pic"
            />
          </div>
        ) : (
          <>
            {authProviders &&
              Object.values(authProviders).map((provider) => (
                <button
                  key={provider.name}
                  className="black_btn"
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      {/**Mobile Nav */}
      {session?.user ? (
        <div className="flex sm:hidden relative">
          <Image
            //src={`/assets/images/logo.svg`}
            src={session?.user.image}
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
            onClick={() => setToggleDropdown((prev) => !prev)}
          />
          {toggleDropdown && (
            <div className="dropdown">
              <Link
                className="dropdown_link"
                href={`/profile`}
                onClick={() => setToggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link
                className="dropdown_link"
                href={`/create-prompt`}
                onClick={() => setToggleDropdown(false)}
              >
                Create Prompt
              </Link>
              <button
                type="button"
                onClick={() => {
                  signOut(), setToggleDropdown(false);
                }}
                className="black_btn"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {authProviders &&
            Object.values(authProviders).map((provider) => (
              <button
                className="black_btn sm:hidden"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
              >
                Sign in
              </button>
            ))}
        </>
      )}
    </nav>
  );
};

export default Nav;
