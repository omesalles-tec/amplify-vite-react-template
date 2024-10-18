import { Button, Icon, Input } from "@aws-amplify/ui-react";
import { Box, SpaceBetween } from "@cloudscape-design/components";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  // Function to handle the change in each input field
  const handleTagChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const newTags = [...tags];
      newTags[index] = event.target.value;
      setTags(newTags);
    }
  };

  // Function to add a new input field
  const handleAddTag = () => {
    const allFilled = tags.every((tag) => tag.trim() !== "");
    if (allFilled) {
      setTags([...tags, ""]);
    } else {
      alert("Please fill out all fields before adding a new one.");
    }
  };

  // Function to delete a specific input field
  const handleDeleteTag = (index: number) => {
    const newTags = tags.map((x) => x);
    newTags.splice(index, 1); // Remove the input at the specified index
    setTags(newTags);
  };

  return (
    <SpaceBetween size="s">
      {tags.map((tag, index) => (
        <Box key={index} margin={{ bottom: "s" }}>
          <Input
            value={tag || ""}
            onChange={(event) => handleTagChange(index, event)}
            placeholder="Tag"
            name={`tag${index}`}
          />
          <Button
            onClick={() => handleDeleteTag(index)}
            formAction="none"
            className="delete-button"
          >
            <Icon name="close" />
            Delete
          </Button>
        </Box>
      ))}
      <Button onClick={handleAddTag}>
        <Icon name="add-plus" />
        Add More Tags
      </Button>
    </SpaceBetween>
  );
};

export default TagInput;