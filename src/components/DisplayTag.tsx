import { HStack, Tag, TagLabel } from "@chakra-ui/react";

function DisplayTag({ categories }: { categories: string[] }) {
    return (<HStack spacing={4}>

        {categories.map((category: string) => {
            return (<Tag key={category} variant='subtle' colorScheme="yellow"><TagLabel key={category}>{category}</TagLabel></Tag>);

        })}

    </HStack>




    );

}
export default DisplayTag;