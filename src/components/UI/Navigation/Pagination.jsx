import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ButtonSVG from "../Buttons/ButtonSVG";
import styles from "./Pagination.module.scss";

export default function Pagination({ page, totalPages, setPage, className }) {
  return (
    <div className={`${styles.pagingWraper} ${className}`}>
      <ButtonSVG
        icon={<ArrowBackIosIcon />}
        onClick={() => setPage(page - 1)}
        className=""
        disabled={page <= 1}
      />
      <span>
        Page {page} of {totalPages}
      </span>
      <ButtonSVG
        icon={<ArrowForwardIosIcon />}
        onClick={() => setPage(page + 1)}
        className=""
        disabled={page >= totalPages}
      />
    </div>
  );
}
