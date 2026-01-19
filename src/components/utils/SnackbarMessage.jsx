export const deleteMessages = {
  success: (entityName) => `${entityName} deleted successfully`,
  error: (entityName) => `Failed to delete ${entityName}`,
};

export const updateMessages = {
  success: (entityName) => `${entityName} updated successfully`,
  error: (entityName) => `Failed to update ${entityName}`,
};

export const creatMessages = {
  success: (entityName) => `${entityName} created successfully`,
  error: (entityName) => `Failed to creat ${entityName}`,
};
