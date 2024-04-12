declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.png";
declare module "*.svg";
declare module "*.webp";
declare module "*.scss" {
  type Styles = Record<string, string>;
  const styles: Styles;
  export = styles;
}
