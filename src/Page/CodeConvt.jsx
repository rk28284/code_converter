import { Box, Button, Heading, Select, Text, VStack ,HStack} from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const files = {
    "script.py": {
      name: "script.py",
      language: "python",
      defaultValue: "Here is some python code",
    },
    "index.html": {
      name: "index.html",
      language: "html",
      defaultValue: "<div></div>",
    },
    "javascript.js": {
      name: "javascript.js",
      language: "javascript",
      defaultValue: "console.log('Hello, World!');",
    },
    "java.java": {
      name: "java.java",
      language: "java",
      defaultValue: "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
    },
    "main.c": {
      name: "main.c",
      language: "c",
      defaultValue: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}",
    },
    "main.cpp": {
      name: "main.cpp",
      language: "cpp",
      defaultValue: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}",
    },
    // Add more file configurations as needed
  };
  

export const CodeConverter = () => {
  const { language } = useParams();
  const [filename, setFilename] = useState("script.py");
  const [load, setLoad] = useState(false);
  const [getans, setAns] = useState("");
  const [select, setSelect] = useState("");
  const editorRef = useRef(null);
  const file = files[filename];

  function handleEditor(editor, monaco) {
    editorRef.current = editor;
  }

  function getValue() {
    if (select === "") {
      alert("Please select a language to convert");
    } else if (editorRef.current.getValue() === "") {
      alert("Put code to convert");
    } else {
      let obj = {
        language: select,
        value: editorRef.current.getValue(),
      };

      setLoad(true);
      axios
        .post("https://codeconverterbackend.onrender.com/convert", obj)
        .then((res) => {
          setAns(res.data);
          setLoad(false);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleOutput() {
    let obj = {
      value: editorRef.current.getValue(),
    };
    setLoad(true);
    axios
      .post("https://codeconverterbackend.onrender.com/output", obj)
      .then((res) => {
        setAns(res.data);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  }

  function handleDebug() {
    let obj = {
      value: editorRef.current.getValue(),
    };
    setLoad(true);
    axios
      .post("https://codeconverterbackend.onrender.com/debug", obj)
      .then((res) => {
        setAns(res.data);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  }

  function handleQuality() {
    let obj = {
      value: editorRef.current.getValue(),
    };
    setLoad(true);
    axios
      .post("https://codeconverterbackend.onrender.com/quality", obj)
      .then((res) => {
        setAns(res.data);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Box background="linear-gradient(315deg, #063465 44%, rgba(9,30,73,1) 100%)" textAlign="center" color="white" overflow="hidden">
      <VStack spacing={4} padding={4}>
        <Heading as="h1" fontFamily="serif">
          Code Converter
        </Heading>
        <Box background="#242323" p={4} borderRadius="md" width="100%" height="100vh">
          <HStack spacing={2} mb={4}>
            <Button onClick={() => setFilename("script.py")} colorScheme="gray">
              Switch to Python
            </Button>
            <Button onClick={() => setFilename("javascript")} colorScheme="gray">
              Switch to JavaScript
            </Button>
            <Button onClick={() => setFilename("java")} colorScheme="gray">
              Switch to Java
            </Button>
            <Button onClick={() => setFilename("index.html")} colorScheme="gray">
              Switch to HTML
            </Button>
            <Button onClick={() => setFilename("C++")} colorScheme="gray">
              Switch to C++
            </Button>
          </HStack>

          <Editor
  height="70vh"
  width="100%"
  theme="vs-dark"
  path={files[filename].name} // Ensure that 'filename' corresponds to a valid key
  onMount={handleEditor}
  defaultLanguage={files[filename].language} // Ensure that 'filename' corresponds to a valid key
  defaultValue={files[filename].defaultValue} // Ensure that 'filename' corresponds to a valid key
/>

        </Box>

        <Box background="#242323" p={4} borderRadius="md" width="100%" height="70vh">
          <HStack spacing={2} mb={4}>
            <Button onClick={handleOutput} colorScheme="gray">
              Get Output
            </Button>
            <Button onClick={getValue} colorScheme="gray">
              Convert
            </Button>
            <Select
              onChange={(e) => setSelect(e.target.value)}
              colorScheme="gray"
              placeholder="Set language to convert"
            >
              <option value="Python">Python</option>
              <option value="Javascript">Javascript</option>
              <option value="Java">Java</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
            </Select>
            <Button onClick={handleDebug} colorScheme="gray">
              Debug
            </Button>
            <Button onClick={handleQuality} colorScheme="gray">
              Quality check
            </Button>
          </HStack>

          <Text fontSize="lg" mb={2} textAlign="left">
            Output :
          </Text>
          {load ? (
            <Text>Loading...</Text>
          ) : (
            <Editor
              height="100%"
              width="100%"
              theme="vs-dark"
              language="plaintext"
              value={getans}
              options={{
                readOnly: true,
              }}
            />
          )}
        </Box>
      </VStack>
    </Box>
  );
};
