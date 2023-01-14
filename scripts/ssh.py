class SshConnection(object):
    def __init__(self, user, host):
        self.id = generate_connection_id()
        self.user = user
        self.host = host

        self.temp_path = abspath(join('temp', 'ssh-connections', self.id))
        self.config_path = join(self.temp_path, 'ssh_config')
        self.control_path = join(self.temp_path, 'ssh_control')

        cmd('rm', '-rf', self.temp_path)
        cmd('mkdir', '-p', self.temp_path)

        with open(self.config_path, 'w') as file:
            file.writelines([
                f'HostName {host}\n',
                f'User {user}\n',
                'ControlMaster auto\n',
                f'ControlPath {self.control_path}\n'
            ])

    def __enter__(self):
        cmd('ssh', '-F', self.config_path, '-MNf', self.host)
        return self

    def __exit__(self, *args):
        cmd('ssh', '-qF', self.config_path, '-O', 'exit', self.host)
        cmd('rm', '-rf', self.temp_path)

    def ssh(self, script, **kwargs):
        return cmd('ssh', '-qtF', self.config_path, self.host, script, **kwargs)

    def scp(self, files, destination):
        cmd('scp', '-F', self.config_path, '-r',
            *files, f'{self.host}:{destination}')

    def writeFile(self, file, content):
        self.ssh(f"printf '%s' '{content}' > '{file}'")

    def readFile(self, file):
        return self.ssh(
            f"if [ -f '{file}' ]; then cat '{file}'; fi", capture_output=True, text=True).stdout


def generate_connection_id():
    return ''.join(
        random.choice(string.ascii_lowercase)
        for i in range(16))
