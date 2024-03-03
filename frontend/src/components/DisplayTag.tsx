import { HStack, Tag, TagLabel } from "@chakra-ui/react";
//Component used to display different story categories
function DisplayTag({ categories }: { categories: string[] }) {
    return (<HStack spacing={4}>

        {categories.map((category: string) => {
            return (<Tag key={category} variant='subtle' colorScheme="yellow"><TagLabel key={category}>{category}</TagLabel></Tag>);

        })}

    </HStack>




    );

}
export default DisplayTag;