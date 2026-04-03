import clsx from "clsx";

export default function Container({className, children, ...props}: React.ComponentProps<'div'>) {
  return <div className={clsx('w-full', className)} {...props}>
    <div className="max-w-[1200px] px-10 mx-auto">
      {children}
    </div>
  </div>
}