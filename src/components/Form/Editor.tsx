import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Flex, HStack, Icon, useToast } from "@chakra-ui/react";
import { updatePoliticSetting } from "../../hooks/useSetting";
import { RiSaveLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function EditorText() {
  const editorRef = useRef(null);
  var [politic, setPolitic] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();

  const handleShowToast = (msg, tipo) => {
    toast({
      title: "Atenção",
      status: tipo,
      description: msg,
      isClosable: true,
      position: "top-right",
    });
  };

  const updatePolitic = async () => {
    setIsSubmitting(true);
    if (editorRef.current) {
      //console.log(editorRef.current.getContent());
      setPolitic(editorRef.current.getContent());

      if (politic != null && politic != "") {
        const { data } = await updatePoliticSetting(politic);

        if (data.error == true) {
          handleShowToast(data.mensagem, "error");
        } else {
          handleShowToast(data.mensagem, "success");
        }
      }
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <Editor
        apiKey="7xpcwb0kcxn93yms68x6z3w2ffzcj63ob1xcwhp30mafr09i"
        onInit={(evt, editor1) => (editorRef.current = editor1)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <Flex mt="8" justify="flex-end">
        <HStack spacing="0">
          <Button
            onClick={updatePolitic}
            _hover={{ bg: "green.800" }}
            size="sm"
            type="submit"
            bgColor="green.900"
            loadingText="Salvando..."
            color={"white"}
            leftIcon={<Icon as={RiSaveLine} />}
            isLoading={isSubmitting}
          >
            Atualizar
          </Button>
        </HStack>
      </Flex>
    </>
  );
}
