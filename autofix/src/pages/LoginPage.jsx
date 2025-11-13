import React from "react";
import { Car } from "lucide-react";

export default function LoginPage({ onLogin, onSwitchToSignup, authForm, setAuthForm }) {
  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center p-6">
      <div className="bg-black rounded-3xl  p-12 w-full max-w-md border-35 border-black space-y-8 b">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gray-900 rounded-xl border-5">
              <Car size={56} className="text-blue-500" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-100" style={{ fontFamily: "cursive" }}>
            AutoFix
          </h1>
          <p className="text-gray-400 text-base tracking-wider border-10 border-black">---- Maintenance Made Smarter ----</p>
        </div>

        <div className="flex gap-4 bg-gray-900 p-1 rounded-2xl border-10">
          <button className="flex-1 py-3 rounded-xl font-semibold bg-blue-600 text-white border-2 border-blue-500 shadow-lg hover:bg-blue-700 transition-all duration-300">
            Login
          </button>
          <button
            onClick={onSwitchToSignup}
            className="flex-1 py-3 rounded-xl font-semibold bg-gray-900 text-gray-400 border-2 border-transparent hover:bg-gray-800 hover:border-gray-600 transition-all duration-300"
          >
            Sign Up
          </button>
        </div>

        <div className="space-y-6 border-8">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-300">E-Mail</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div className="space-y-3 border-t-8 border-b-20">
            <label className="block text-sm font-semibold text-gray-300">Password</label>
            <input
              type="password"
              placeholder="  Enter your password"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900 text-gray-100  focus:outline-none focus:ring-1 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200 rounded-3xl"
            />
          </div>
          <button
            onClick={onLogin}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg border-2 border-blue-500 text-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}