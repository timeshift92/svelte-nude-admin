
<nu-block width="50vh||100vh">
    <nu-card   border="1 1 0 1" radius="1 1 0 0" >
	<nu-heading level="5"  fill color="var(--nu-focus-color)" >
	Login
	</nu-heading>

	</nu-card>
	<nu-line gap="1"></nu-line>
	<nu-card display="flex" flow="column" gap="2" padding="2 1 1 1"  radius="0" border="0 1 1 1" >
		<nu-input shadow="0"  placeholder=" " describedby="tooltip" >
		<nu-tooltip
		as="fancy-tooltip"
		width="min(11em)"
		opacity="^ :tooltip:empty[1] :empty[.5] 1"
		border="^ :tooltip:empty[1b] :empty[0] 1b"
		size="^ :tooltip:empty[xs] :empty[md] xs"
		radius="1r 1r 0 0" move="^ :tooltip:empty[1r 0] :empty[1r 4.5x] 1r 0"
		transition="move, size, border, color" fill="^ :tooltip:empty[input] :empty[clear] input"
		color="^ :tooltip:empty[text] :empty[focus] text"
		shadow="0"
		text="nowrap"
		place="outside-top left">
		Email
		</nu-tooltip>
		<input placeholder="">
		</nu-input>
		<nu-input placeholder=" "  describedby="tooltip" >
		<nu-link place="outside-top right" shadow="0"    text=":hover[w3] w2  v-middle" padding="0 1px 0 1"> forgot password </nu-link>
		<nu-tooltip
		as="fancy-tooltip"
		width="min(11em)"
		opacity="^ :tooltip:empty[1] :empty[.5] 1"
		border="^ :tooltip:empty[1b] :empty[0] 1b"
		size="^ :tooltip:empty[xs] :empty[md] xs"
		radius="1r 1r 0 0" move="^ :tooltip:empty[1r 0] :empty[1r 4.5x] 1r 0"
		transition="move, size, border, color" fill="^ :tooltip:empty[input] :empty[clear] input"
		color="^ :tooltip:empty[text] :empty[focus] text"
		shadow="0"
		text="nowrap"
		place="outside-top left">
		Password
		</nu-tooltip>

		<input placeholder="">
		</nu-input>
	</nu-card>
<nu-line></nu-line>
</nu-block>


<style>
nu-card{
	border-top: 2px solid var(--nu-violet-special-bg-color);
}
</style>
