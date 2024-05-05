"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BASE_URL } from "./config";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<number | null>(null);

  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<number | null>(null);

  const handleLogin = async () => {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setUsername("");
      setPassword(null);

      sessionStorage.setItem("userId", data.id);
      sessionStorage.setItem("username", data.username);

      if (data.role === 1) {
        router.push("/home");
      } else if (data.role === 2) {
        router.push("/admin");
      }
    } else {
      console.error(data);
    }
  };

  const handleRegister = async () => {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsername,
        email,
        password: registerPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Clear the input fields
      setRegisterUsername("");
      setEmail("");
      setRegisterPassword(null);

      sessionStorage.setItem("userId", data.id);
      sessionStorage.setItem("username", data.username);

      // Navigate to "/home"
      router.push("/home");
    } else {
      console.error(data);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row gap-6">
          <div>
            <Image src="/mylogo.png" alt="Logo" width={150} height={150} />
          </div>
          <div className="pl-8 flex items-center">About</div>
          <div className="flex items-center">FAQ</div>
        </div>
        <div className="flex flex-row gap-4 font-semibold">
          <div
            className="flex items-center hover:text-accent cursor-pointer"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_1"
              ) as HTMLDialogElement;
              if (modal) modal.showModal();
            }}
          >
            Sign In
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-[30%]">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Login With</h3>
              <div className="flex flex-col w-full border-opacity-50">
                <div className="flex flex-row w-full items-center justify-center gap-20 p-2">
                  <div className="w-14 h-14 rounded-full">
                    <svg viewBox="0 0 100 100">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                        fill="#24292f"
                      />
                    </svg>
                  </div>
                  <div className="bg-red-500 w-14 h-14 rounded-full relative">
                    <svg
                      viewBox="0 0 52 52"
                      className="fill-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <path d="M12 23.403V23.39 10.389L11.88 10.3h-.01L9.14 8.28C7.47 7.04 5.09 7.1 3.61 8.56 2.62 9.54 2 10.9 2 12.41v3.602L12 23.403zM38 23.39v.013l10-7.391V12.41c0-1.49-.6-2.85-1.58-3.83-1.46-1.457-3.765-1.628-5.424-.403L38.12 10.3 38 10.389V23.39zM14 24.868l10.406 7.692c.353.261.836.261 1.189 0L36 24.868V11.867L25 20l-11-8.133V24.868zM38 25.889V41c0 .552.448 1 1 1h6.5c1.381 0 2.5-1.119 2.5-2.5V18.497L38 25.889zM12 25.889L2 18.497V39.5C2 40.881 3.119 42 4.5 42H11c.552 0 1-.448 1-1V25.889z"></path>
                    </svg>
                  </div>
                  <div className="bg-blue-500 w-14 h-14 rounded-full relative">
                    <svg
                      viewBox="0 0 50 50"
                      className="fill-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                    </svg>
                  </div>
                </div>
                <div className="divider">OR</div>
                <div className="w-full space-y-2">
                  <div>
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                      </svg>
                      <input
                        type="text"
                        className="grow border-0"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <input
                        type="password"
                        className="grow border-0"
                        value={password || ""}
                        onChange={(e) => setPassword(Number(e.target.value))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleLogin();
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div>
                    <button
                      className="btn btn-accent w-full"
                      onClick={handleLogin}
                    >
                      LOGIN
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-6 text-center font-light">
                Looking to{" "}
                <a href="#" className="text-accent">
                  create an account
                </a>
                ?
              </div>
            </div>
          </dialog>

          <div
            className="border border-accent rounded-full w-28 h-10 text-accent flex justify-center items-center hover:text-white hover:bg-accent cursor-pointer"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_2"
              ) as HTMLDialogElement;
              if (modal) modal.showModal();
            }}
          >
            Sign Up
          </div>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Register with</h3>
              <div className="flex flex-col w-full border-opacity-50">
                <div className="flex flex-row w-full items-center justify-center gap-20 p-2">
                  <div className="w-14 h-14 rounded-full">
                    <svg viewBox="0 0 100 100">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                        fill="#24292f"
                      />
                    </svg>
                  </div>
                  <div className="bg-red-500 w-14 h-14 rounded-full relative">
                    <svg
                      viewBox="0 0 52 52"
                      className="fill-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <path d="M12 23.403V23.39 10.389L11.88 10.3h-.01L9.14 8.28C7.47 7.04 5.09 7.1 3.61 8.56 2.62 9.54 2 10.9 2 12.41v3.602L12 23.403zM38 23.39v.013l10-7.391V12.41c0-1.49-.6-2.85-1.58-3.83-1.46-1.457-3.765-1.628-5.424-.403L38.12 10.3 38 10.389V23.39zM14 24.868l10.406 7.692c.353.261.836.261 1.189 0L36 24.868V11.867L25 20l-11-8.133V24.868zM38 25.889V41c0 .552.448 1 1 1h6.5c1.381 0 2.5-1.119 2.5-2.5V18.497L38 25.889zM12 25.889L2 18.497V39.5C2 40.881 3.119 42 4.5 42H11c.552 0 1-.448 1-1V25.889z"></path>
                    </svg>
                  </div>
                  <div className="bg-blue-500 w-14 h-14 rounded-full relative">
                    <svg
                      viewBox="0 0 50 50"
                      className="fill-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                    </svg>
                  </div>
                </div>
                <div className="divider">OR</div>
                <div className="w-full space-y-2">
                  <div>
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                      </svg>
                      <input
                        type="text"
                        className="grow border-0"
                        placeholder="Username"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                      </svg>
                      <input
                        type="text"
                        className="grow border-0"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <input
                        type="password"
                        className="grow border-0"
                        value={registerPassword || ""}
                        onChange={(e) =>
                          setRegisterPassword(Number(e.target.value))
                        }
                      />
                    </label>
                  </div>
                  <div>
                    <button
                      className="btn btn-accent w-full"
                      onClick={handleRegister}
                    >
                      CREATE AN ACCOUNT
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-6 text-center font-light">
                Already have an Account?{" "}
                <a href="#" className="text-accent">
                  Sign In
                </a>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      <div className="grid grid-cols-2 w-full place-items-center">
        <div className="bg-white pl-40 h-full w-full rounded-l-lg flex flex-col items-start justify-center">
          <div className="text-6xl font-semibold">COVID-19</div>
          <div className="text-6xl font-semibold">MONITORING</div>
          <div className="text-2xl font-light text-gray-400">
            What You Need To Know About Coronavirus
          </div>
        </div>
        <div className="bg-white h-full w-full rounded-r-lg">
          <Image src="/myhero.jpg" alt="Logo" width={700} height={700} />
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x-2 w-full h-[10rem] bg-white rounded-lg">
        <div className="flex items-center justify-center gap-4 w-full">
          <div className="w-12 h-12 bg-primary rounded-full relative">
            <svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              viewBox="0 0 32 32"
            >
              <path
                fill="#a7d9fc"
                d="M27.38 27.42a2 2 0 0 1-2.83 0L23.08 26a1 1 0 0 1-.29-.7 1 1 0 0 1 .29-.71l1.46-1.46a1 1 0 0 1 .71-.29 1 1 0 0 1 .7.29l1.47 1.47a2 2 0 0 1-.04 2.82Z"
              />
              <path
                fill="#4473b7"
                d="m28.83 23.13-1.47-1.47a3 3 0 0 0-4.24 0l-2.33-2.33a1 1 0 0 0-1.41 0 9 9 0 1 1 2.29-3.73 1 1 0 0 0 1.91.6A11 11 0 1 0 20 21.44l1.66 1.66a3 3 0 0 0 0 4.24l1.47 1.47A4 4 0 0 0 26 30a4 4 0 0 0 2.87-1.22 4 4 0 0 0 0-5.66Zm-1.46 4.29a2 2 0 0 1-2.83 0L23.08 26a1 1 0 0 1 0-1.41l1.46-1.46a1 1 0 0 1 1.41 0l1.47 1.47A2 2 0 0 1 28 26a2 2 0 0 1-.62 1.42Z"
              />
              <path
                fill="#4473b7"
                d="M10.63 16.49A2 2 0 0 1 8.69 15L8 12.31a1 1 0 1 1 2-.48l.67 2.66 5.73-4.76a1 1 0 1 1 1.28 1.54l-5.88 4.84-.11.08a2 2 0 0 1-1.06.3Z"
              />
            </svg>
          </div>
          <div>
            <div className="text-lg font-medium">144,824</div>
            <div>Confirmed Cases</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 w-full">
          <div className="w-12 h-12 bg-primary rounded-full">
            <svg viewBox="0 0 100 100">
              <path
                fill="#231f20"
                d="M29.5 38.98h16v20.835a7.972 7.972 0 0 1 5.74 3.658 7.771 7.771 0 0 1 1.26-.103 8.1 8.1 0 0 1 1 .067V38.98h16c.55 0 1-.45 1-1v-6c0-.56-.45-1-1-1h-16v-12c0-.56-.45-1-1-1h-6c-.55 0-1 .44-1 1v12h-16c-.55 0-1 .44-1 1v6c0 .55.45 1 1 1z"
              ></path>
              <path
                fill="#3c93c9"
                d="M76.5 75.98c0 3.3-2.69 6-6 6h-41c-3.31 0-6-2.7-6-6 0-3.31 2.69-6 6-6 .32 0 .63.02.95.08.81-2.39 3.07-4.08 5.66-4.08.88 0 1.73.19 2.51.55a6.015 6.015 0 0 1 5.88-4.78c2.62 0 4.87 1.71 5.67 4.1a5.947 5.947 0 0 1 8.03 3.73c.79-.18 1.6-.2 2.42-.03a5.963 5.963 0 0 1 5.3-3.24c2.45 0 4.64 1.52 5.55 3.76 2.87.47 5.03 2.94 5.03 5.91z"
              ></path>
            </svg>
          </div>
          <div>
            <div className="text-lg font-medium">5,398</div>
            <div>Deaths</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 w-full">
          <div className="w-12 h-12 bg-primary rounded-full relative">
            <svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              viewBox="0 0 30 30"
            >
              <path
                fill="#374150"
                d="M30.805 13.742h-1.813c-.568 0-1.202.436-1.409.966l-2.659 6.847h-10.32v-4.144H6.631c-6.729 0-6.47 5.262-6.47 7.164H31.84v-9.797c0-.57-.465-1.036-1.035-1.036z"
              ></path>
              <path
                fill="#2878c8"
                d="M31.84 30.425c0 .286-.23.517-.517.517H.678a.517.517 0 0 1-.518-.517v-4.209c0-.286.232-.519.518-.519h30.646c.286 0 .517.232.517.519v4.209z"
              ></path>
              <circle cx="25.836" cy="9.724" r="2.595" fill="#2878c8"></circle>
              <path
                fill="#2878c8"
                d="m21.941 14.445-1.203 2.493c-.563-1.033-1.514-1.729-3.055-2.242-1.514-.502-2.059-1.415-2.229-2.205h.747c.857 0 1.552-.696 1.552-1.555V7.053c0-.858-.694-1.555-1.552-1.555h-2.483c-.857 0-1.554.696-1.554 1.555v3.884c0 .858.696 1.555 1.554 1.555h.687c.196 1.197.959 2.526 2.953 3.188 1.238.412 1.982.924 2.43 1.688H15.77v3.021h8.284l2.849-7.165c-2.377-.791-3.986-.732-4.962 1.221z"
              ></path>
              <path
                fill="#374150"
                d="M14.188 4.333h1.554c0-2.127-1.595-3.274-3.097-3.274-.841 0-1.622.332-2.198.937-.438.458-.963 1.297-.963 2.686v11.564h1.554V4.681c0-.691.185-1.249.532-1.612.28-.294.661-.456 1.075-.456.742-.001 1.543.538 1.543 1.72z"
              ></path>
            </svg>
          </div>
          <div>
            <div className="text-lg font-medium">70,234</div>
            <div>Recovered</div>
          </div>
        </div>
      </div>
    </main>
  );
}
