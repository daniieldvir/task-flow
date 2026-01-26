import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { memo } from "react";
import { getAvatarColor } from "../../utils/ColorUtils";
import styles from "./TaskCard.module.scss";

const TaskCard = ({ task, onEdit }) => {
  const priority = task.priority || "Medium";
  const priorityClass = `priority${priority}`;
  
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div className={styles.taskCard} onClick={() => onEdit(task)}>
      <div className={styles.cardHeader}>
        <span className={`${styles.priorityBadge} ${styles[priorityClass]}`}>
          {priority}
        </span>
        <div 
          className={styles.moreButton} 
          onClick={(e) => { 
            e.stopPropagation(); 
            onEdit(task); 
          }}
        >
          <EditIcon fontSize="small" />
        </div>
      </div>

      <div className={styles.tags}>
        {task.tags?.map((tag, idx) => (
          <span key={idx} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <h4 className={styles.taskTitle}>{task.name}</h4>
      <p className={styles.taskDesc}>{task.description}</p>

      <div className={styles.cardFooter}>
        <div className={styles.metaInfo}>
          <div 
            className={styles.avatar} 
            style={{ background: getAvatarColor(task.author || 'User') }}
            title={task.author || "Unknown"}
          >
            {task.author ? task.author.charAt(0).toUpperCase() : <PersonIcon fontSize="small" />}
          </div>
          {(task.dueDate || task.createDate) && (
            <div className={`${styles.date} ${isOverdue ? styles.overdue : ''}`}>
              <AccessTimeIcon style={{ fontSize: 14 }} />
              <span>{formatDate(task.dueDate || task.createDate)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(TaskCard);
