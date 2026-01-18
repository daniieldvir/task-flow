import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export default function ProgressBar({
  val1,
  val2,
  colors = { val1: "#eee", val2: "#4caf50" },
  tooltipText1 = "",
  tooltipText2 = "",
}) {
  const total = val1 + val2;
  const completedPercent = total ? (val2 / total) * 100 : 0;
  const val1Percent = total ? (val1 / total) * 100 : 0;

  return (
    <Box sx={{ width: 300 }}>
      <Typography variant="body2" color="text.secondary" sx={{ p: 0, m: 0 }}>
        Tasks Progress
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 5,
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: colors.val1,
        }}
      >
        <Tooltip title={tooltipText2} arrow>
          <Box
            sx={{
              position: "absolute",
              left: 0,
              height: "100%",
              width: `${completedPercent}%`,
              backgroundColor: colors.val2,
              borderRadius: 8,
            }}
          />
        </Tooltip>

        {val1 > 0 && (
          <Tooltip title={tooltipText1} arrow>
            <Box
              sx={{
                position: "absolute",
                left: `${completedPercent}%`,
                height: "100%",
                width: `${val1Percent}%`,
                backgroundColor: colors.val1,
              }}
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
