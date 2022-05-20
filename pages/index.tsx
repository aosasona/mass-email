import { FC, useState } from "react";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import Dummy from "@/components/Dummy";
import Meta from "@/defaults/Meta";
import axios from "axios";
import { BsX } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../config/api";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
import "suneditor/dist/css/suneditor.min.css";
const file = require("../data/data.json");

interface DataInterface {
  title: string;
  signature: string;
  name: string;
}

interface EmailInterface {
  email: string | any;
}

const Home: NextPage<null> = () => {
  //DATA STATE
  const [Content, setContent] = useState<string>("");
  const [Emails, setEmails] = useState<EmailInterface[]>(file);
  const [Data, setData] = useState<DataInterface>({
    title: "",
    signature: "Frokes, Co-founder",
    name: "Frokes From Frikax",
  });
  const [Loading, setLoading] = useState<boolean>(false);

  //Remove Email From List
  const RemoveData = (data: string): void => {
    const newData: EmailInterface[] = Emails.filter(
      (current) => current.email.toLowerCase() !== data.toLowerCase()
    );
    setEmails(newData);
  };

  //Handle Submission
  const formHandler = () => {
    if (confirm("Are you sure you want to send this email?")) {
      if (!(Data.title && Data.signature && Data.name && Content)) {
        toast.error("All fields are required!");
      } else {
        setLoading(true);
        axios
          .post(`${API_URL}/mail`, {
            title: Data.title.trim(),
            content: Content,
            signature: Data.signature,
            name: Data.name,
            people: Emails,
          })
          .then((response) => {
            setLoading(false);
            toast.success(response.data.message);
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.message);
          });
      }
    }
  };

  return (
    <div>
      <Meta title="Mass Email Sender" desc="For sending mass emails" />
      <main className="w-[95%] lg:w-4/5 2xl:w-4/6 mx-auto mt-[2vh] lg:mt-[5vh]">
        {Loading && (
          <div className="Loader absolute top-6 right-6 w-8 aspect-square bg-transparent border-t-[3px] border-l-[3px] border-[3px] border-t-neutral-100 border-l-neutral-100 border-neutral-700 rounded-full"></div>
        )}
        <h1 className="font-thin text-4xl lg:text-6xl">Compose Email</h1>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-10">
          <div>
            <input
              name="Title"
              placeholder="Title"
              className="w-full bg-neutral-800 text-neutral-300 focus:outline-none focus:border-neutral-500 focus:border-[1px] placeholder-neutral-500 py-4 px-3 mb-4"
              value={Data.title}
              onChange={(e) => setData({ ...Data, title: e.target.value })}
            />
            <SunEditor
              height="40vh"
              setContents={Content}
              onChange={(value) => setContent(value)}
            />
            <input
              name="Name"
              placeholder="Name ex. Frokes From Frikax"
              className="w-full bg-neutral-800 text-neutral-300 focus:outline-none focus:border-neutral-500 focus:border-[1px] placeholder-neutral-500 py-4 px-3 my-4"
              value={Data.name}
              onChange={(e) => setData({ ...Data, name: e.target.value })}
            />
            <input
              name="Signature"
              placeholder="Signature ex. Frokes, Co-founder"
              className="w-full bg-neutral-800 text-neutral-300 focus:outline-none focus:border-neutral-500 focus:border-[1px] placeholder-neutral-500 py-4 px-3 mb-4"
              value={Data.signature}
              onChange={(e) => setData({ ...Data, signature: e.target.value })}
            />
            <button
              name="Send"
              type="button"
              className="w-full bg-neutral-300 text-neutral-900 text-sm hover:bg-neutral-700 hover:text-neutral-200 transition-all py-3"
              onClick={formHandler}
            >
              Send
            </button>
          </div>
          <div className="h-[75vh] max-h-[75vh] bg-neutral-800 px-3 lg:px-6 py-5">
            <h1 className="font-thin text-3xl lg:text-4xl">Emails</h1>

            <div className="mt-3 max-h-[65vh] overflow-y-scroll">
              {Emails.length > 0 ? (
                <>
                  {Emails.map((person, index) => (
                    <div
                      className="flex justify-between bg-neutral-700 text-neutral-300 my-3 lg:my-4 px-4 py-4"
                      key={index}
                    >
                      <p>{person.email}</p>
                      <button
                        name="Remove"
                        onClick={() => RemoveData(person.email)}
                      >
                        <BsX size={20} />
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-center text-neutral-500 my-16">
                  No data to display
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Home;
